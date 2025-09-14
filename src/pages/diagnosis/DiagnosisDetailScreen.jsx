import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDiagnosisDetail } from "../../api/diagnosis";
import { useAuth } from "../../context/AuthContext";
import { CalendarDays, ClipboardList, Pill, User, Download } from "lucide-react";

const DiagnosisDetailScreen = () => {
  const { id } = useParams();
  const { authTokens } = useAuth();

  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchDiagnosisDetail(id, authTokens.access);
        setDiagnosis(res.data);
      } catch (err) {
        console.error("Failed to load diagnosis detail", err);
        alert("Error loading diagnosis details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, authTokens]);

  const generateMedicationPDF = () => {
    if (!selectedVisit || !selectedVisit.medications?.length) {
      alert("No medications to download");
      return;
    }

    // Create PDF content
    const content = `
      <html>
        <head>
          <title>Medication Prescription</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 40px;
              line-height: 1.6;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #4f46e5;
              padding-bottom: 20px;
            }
            .hospital-name {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 5px;
            }
            .prescription-title {
              font-size: 20px;
              color: #4f46e5;
              margin-bottom: 10px;
            }
            .patient-info {
              background-color: #f8fafc;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .info-row {
              margin-bottom: 8px;
            }
            .label {
              font-weight: bold;
              color: #374151;
            }
            .medications-section {
              margin-top: 20px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #dc2626;
              margin-bottom: 15px;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 5px;
            }
            .medication-item {
              background-color: #fefefe;
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              padding: 12px;
              margin-bottom: 10px;
            }
            .med-name {
              font-size: 16px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 5px;
            }
            .med-details {
              font-size: 14px;
              color: #6b7280;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #9ca3af;
              border-top: 1px solid #e5e7eb;
              padding-top: 20px;
            }
            .doctor-signature {
              margin-top: 60px;
              text-align: right;
            }
            .signature-line {
              border-top: 1px solid #000;
              width: 200px;
              margin-left: auto;
              margin-top: 40px;
              text-align: center;
              padding-top: 5px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="hospital-name">${diagnosis?.hospital || 'Medical Center'}</div>
            <div class="prescription-title">Medication Prescription</div>
          </div>
          
          <div class="patient-info">
            <div class="info-row">
              <span class="label">Diagnosis:</span> ${diagnosis?.title || 'N/A'}
            </div>
            <div class="info-row">
              <span class="label">Visit Date:</span> ${new Date(selectedVisit.visit_date).toLocaleDateString()}
            </div>
            <div class="info-row">
              <span class="label">Doctor:</span> ${selectedVisit.doctor_name || 'N/A'}
            </div>
            <div class="info-row">
              <span class="label">Generated:</span> ${new Date().toLocaleDateString()}
            </div>
          </div>

          <div class="medications-section">
            <div class="section-title">Prescribed Medications</div>
            ${selectedVisit.medications.map((med, idx) => `
              <div class="medication-item">
                <div class="med-name">${idx + 1}. ${med.name}</div>
                <div class="med-details">
                  <strong>Dosage:</strong> ${med.dosage}<br>
                  <strong>Frequency:</strong> ${med.frequency}
                </div>
              </div>
            `).join('')}
          </div>

          ${selectedVisit.notes ? `
            <div style="margin-top: 30px;">
              <div class="section-title">Doctor's Notes</div>
              <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                ${selectedVisit.notes.replace(/\n/g, '<br>')}
              </div>
            </div>
          ` : ''}

          <div class="doctor-signature">
            <div class="signature-line">
              Doctor's Signature
            </div>
          </div>

          <div class="footer">
            This prescription was generated electronically on ${new Date().toLocaleString()}<br>
            Please consult your doctor before making any changes to your medication.
          </div>
        </body>
      </html>
    `;

    // Create and download PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content);
    printWindow.document.close();
    
    printWindow.onload = () => {
      printWindow.print();
      // Note: The window will close automatically after printing in most browsers
      setTimeout(() => {
        printWindow.close();
      }, 100);
    };
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading diagnosis details...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-700 mb-1">{diagnosis.title}</h2>
          <p className="text-sm text-gray-600">
            <strong>Hospital:</strong> {diagnosis.hospital}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Created:</strong> {new Date(diagnosis.created_at).toLocaleString()}
          </p>
        </div>

        {/* Visit Section */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-xl font-semibold text-emerald-700 mb-2">Visit History</h3>
          {diagnosis.visits.length === 0 ? (
            <p className="text-gray-500">No visits recorded yet.</p>
          ) : (
            diagnosis.visits.map((visit, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedVisit(visit);
                  setShowModal(true);
                }}
                className="cursor-pointer border rounded-md p-4 hover:shadow-md transition bg-gradient-to-r from-white via-blue-50 to-white"
              >
                <div className="text-gray-700 text-sm space-y-1">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-emerald-600" />
                    <strong>Date:</strong> {new Date(visit.visit_date).toLocaleString()}
                  </p>
                  <p className="line-clamp-1">
                    <strong>Notes:</strong>{" "}
                    <span className="text-gray-800">{visit.notes || "No notes"}</span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative space-y-4 border-t-4 border-emerald-500">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-emerald-700 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-600" />
              Visit Details
            </h2>

            <div className="text-gray-700 text-sm space-y-2">
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-blue-500" />
                <strong>Date:</strong> {new Date(selectedVisit.visit_date).toLocaleString()}
              </p>
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                <strong>Doctor:</strong> {selectedVisit.doctor_name || "N/A"}
              </p>
              <div>
                <strong>Notes:</strong>
                <p className="whitespace-pre-wrap mt-1 text-gray-800 bg-gray-50 p-2 rounded-md border">
                  {selectedVisit.notes || "No notes provided."}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-md font-semibold text-pink-600 flex items-center gap-1 mt-4">
                  <Pill className="w-4 h-4" />
                  Medications
                </h3>
                {selectedVisit.medications?.length > 0 && (
                  <button
                    onClick={generateMedicationPDF}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors mt-4"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                )}
              </div>
              {selectedVisit.medications?.length > 0 ? (
                <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                  {selectedVisit.medications.map((med, idx) => (
                    <li key={idx}>
                      <span className="font-medium text-gray-800">{med.name}</span> –{" "}
                      {med.dosage}, {med.frequency}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 mt-1">No medications prescribed.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosisDetailScreen;