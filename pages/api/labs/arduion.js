export default function handler(req, res) {
  res.status(200).json({
    lab: "Arduino Biomedical Lab",
    status: "active",
    experiments: [
      "Heart Rate Monitor with Pulse Sensor",
      "ECG Signal Acquisition System",
      "Temperature and Blood Pressure Monitor"
    ]
  });
}
