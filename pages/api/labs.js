export default function handler(req, res) {
  res.status(200).json({
    labs: [
      {
        name: "Arduino Biomedical Lab",
        status: "active",
        experiments: [
          "Heart Rate Monitor with Pulse Sensor",
          "ECG Signal Acquisition System",
          "Temperature and Blood Pressure Monitor"
        ]
      },
      {
        name: "3D Printing Medical Lab",
        status: "active",
        experiments: [
          "Custom Prosthetic Hand Design",
          "3D Heart Model for Surgery Planning",
          "Medical Device Prototyping"
        ]
      },
      {
        name: "DSP Lab",
        status: "active",
        experiments: [
          "Signal Filtering",
          "Fourier Analysis",
          "Biomedical Signal Processing"
        ]
      },
      {
        name: "Virtual Anatomy & Physiology Lab",
        status: "active",
        experiments: [
          "3D Heart Model",
          "Musculoskeletal Simulation",
          "Organ Visualization"
        ]
      },
      {
        name: "Medical Imaging Lab",
        status: "active",
        experiments: [
          "MRI Simulation",
          "CT Scan Reconstruction",
          "X-ray Image Analysis"
        ]
      },
      {
        name: "Biomechanics Lab",
        status: "active",
        experiments: [
          "Forces and Motion Simulation",
          "Gait Analysis",
          "Joint Mechanics"
        ]
      }
    ]
  });
}
