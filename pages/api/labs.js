export default function handler(req, res) {
  res.status(200).json({
    labs: [
      {
        name: "Arduino Biomedical Lab",
        status: "active",
        url: "https://wokwi.com/projects/new/arduino-uno?embed=1&sketch=blink",
        experiments: [
          "Heart Rate Monitor with Pulse Sensor",
          "ECG Signal Acquisition System",
          "Temperature and Blood Pressure Monitor"
        ]
      },
      {
        name: "3D Printing Medical Lab",
        status: "active",
        // صفحة وسيطة للـ model-viewer (نولّدها بالخطوة 2)
        url: "/labs-embed/3d.html",
        experiments: [
          "Custom Prosthetic Hand Design",
          "3D Heart Model for Surgery Planning",
          "Medical Device Prototyping"
        ]
      },
      {
        name: "DSP Lab",
        status: "active",
        url: "https://phet.colorado.edu/sims/html/fourier-making-waves/latest/fourier-making-waves_en.html",
        experiments: ["Signal Filtering", "Fourier Analysis", "Biomedical Signal Processing"]
      },
      {
        name: "Virtual Anatomy & Physiology Lab",
        status: "active",
        url: "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_en.html",
        experiments: ["3D Heart Model", "Musculoskeletal Simulation", "Organ Visualization"]
      },
      {
        name: "Medical Imaging Lab",
        status: "active",
        url: "https://viewer.ohif.org/",
        experiments: ["MRI Simulation", "CT Scan Reconstruction", "X-ray Image Analysis"]
      },
      {
        name: "Biomechanics Lab",
        status: "active",
        url: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html",
        experiments: ["Forces and Motion Simulation", "Gait Analysis", "Joint Mechanics"]
      }
    ]
  });
}
