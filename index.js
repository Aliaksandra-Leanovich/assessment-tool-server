const pdfTemplate = require("./documents/index");
const { EMAIL, PASSWORD } = require("./env.js");
const pdf = require("html-pdf");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/pdf", async (request, response) => {
  try {
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf
        .create(pdfTemplate(request.body), {
          childProcessOptions: {
            env: {
              OPENSSL_CONF: "/dev/null",
            },
          },
        })
        .toBuffer((error, buffer) => {
          if (error) {
            reject(new Error(`Failed to generate PDF: ${error.message}`));
          } else {
            resolve(buffer);
          }
        });
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: EMAIL,
      to: EMAIL,
      subject: "Testing report",
      attachments: [
        {
          filename: "pdf.pdf",
          content: pdfBuffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        response.status(500).send("Error sending email.");
      } else {
        console.log("Email sent: " + info.response);
        response.send("PDF generated and sent via email.");
      }
    });

    response.set(
      "Access-Control-Allow-Origin",
      "https://assessment-tool-ff3c7.firebaseapp.com"
    );
    response.send({ msg: "This has CORS enabled" });
  } catch (error) {
    console.log(error);
    response.status(500).send("Error generating PDF.");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
