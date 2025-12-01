// const content = `
//       <html>
//         <head>
//           <title>Medication Prescription</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               margin: 40px;
//               line-height: 1.6;
//               color: #333;
//             }
//             .header {
//               text-align: center;
//               margin-bottom: 30px;
//               border-bottom: 2px solid #4f46e5;
//               padding-bottom: 20px;
//             }
//             .hospital-name {
//               font-size: 24px;
//               font-weight: bold;
//               color: #1f2937;
//               margin-bottom: 5px;
//             }
//             .prescription-title {
//               font-size: 20px;
//               color: #4f46e5;
//               margin-bottom: 10px;
//             }
//             .patient-info {
//               background-color: #f8fafc;
//               padding: 15px;
//               border-radius: 8px;
//               margin-bottom: 20px;
//             }
//             .info-row {
//               margin-bottom: 8px;
//             }
//             .label {
//               font-weight: bold;
//               color: #374151;
//             }
//             .medications-section {
//               margin-top: 20px;
//             }
//             .section-title {
//               font-size: 18px;
//               font-weight: bold;
//               color: #dc2626;
//               margin-bottom: 15px;
//               border-bottom: 1px solid #e5e7eb;
//               padding-bottom: 5px;
//             }
//             .medication-item {
//               background-color: #fefefe;
//               border: 1px solid #e5e7eb;
//               border-radius: 6px;
//               padding: 12px;
//               margin-bottom: 10px;
//             }
//             .med-name {
//               font-size: 16px;
//               font-weight: bold;
//               color: #1f2937;
//               margin-bottom: 5px;
//             }
//             .med-details {
//               font-size: 14px;
//               color: #6b7280;
//             }
//             .footer {
//               margin-top: 40px;
//               text-align: center;
//               font-size: 12px;
//               color: #9ca3af;
//               border-top: 1px solid #e5e7eb;
//               padding-top: 20px;
//             }
//             .doctor-signature {
//               margin-top: 60px;
//               text-align: right;
//             }
//             .signature-line {
//               border-top: 1px solid #000;
//               width: 200px;
//               margin-left: auto;
//               margin-top: 40px;
//               text-align: center;
//               padding-top: 5px;
//               font-size: 14px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <div class="hospital-name">${diagnosis?.hospital || 'Medical Center'}</div>
//             <div class="prescription-title">Medication Prescription</div>
//           </div>
//           <div class="patient-info">
//             <div class="info-row">
//               <span class="label">Patient Name :</span> ${patientName || 'N/A'}
//             </div>
//           <div class="patient-info">
//             <div class="info-row">
//               <span class="label">Diagnosis:</span> ${diagnosis?.title || 'N/A'}
//             </div>
//             <div class="info-row">
//               <span class="label">Visit Date:</span> ${new Date(selectedVisit.visit_date).toLocaleDateString()}
//             </div>
//             <div class="info-row">
//               <span class="label">Doctor:</span> ${selectedVisit.doctor_name || 'N/A'}
//             </div>
//             <div class="info-row">
//               <span class="label">Generated:</span> ${new Date().toLocaleDateString()}
//             </div>
//           </div>

//           <div class="medications-section">
//             <div class="section-title">Prescribed Medications</div>
//             ${selectedVisit.medications.map((med, idx) => `
//               <div class="medication-item">
//                 <div class="med-name">${idx + 1}. ${med.name}</div>
//                 <div class="med-details">
//                   <strong>Number of Days:</strong> ${med.noOfDays}<br>
//                   <strong>Dosage Frequency:</strong> ${med.dosageDuration}
//                 </div>
//               </div>
//             `).join('')}
//           </div>

//           ${selectedVisit.notes ? `
//             <div style="margin-top: 30px;">
//               <div class="section-title">Doctor's Notes</div>
//               <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
//                 ${selectedVisit.notes.replace(/\n/g, '<br>')}
//               </div>
//             </div>
//           ` : ''}

//           <div class="doctor-signature">
//             <div class="signature-line">
//               Doctor's Signature
//             </div>
//           </div>

//           <div class="footer">
//             This prescription was generated electronically on ${new Date().toLocaleString()}<br>
//             Please consult your doctor before making any changes to your medication.
//           </div>
//         </body>
//       </html>
//     `;
