module.exports = ({ answers, questions, date, email, level }) => {
  const today = new Date();
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Result of the test</title>
    <style>
      .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
      }
      .margin-top {
        margin-top: 50px;
      }
      .justify-center {
        text-align: center;
      }
      .date {
        width: 100%;
        text-align: right;
      }
      .invoice-box table td {
        padding: 5px;
        vertical-align: top;
      }
      .invoice-box table tr.top table td {
        padding-bottom: 20px;
      }
      .information {
        padding: 40px 0;
      }
      .item {
        border-bottom: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="invoice-box">
        <tr class="top">
          <td colspan="2">
            <table>
              <tr>
                <td class="title">
                  <img
                    src="https://media.licdn.com/dms/image/C4D0BAQF3nIi15MId8A/company-logo_200_200/0/1621600119206?e=2147483647&v=beta&t=iW3lU3BHdzN9QdK-pKOEIwirxmKrGhrSdrPF4QhxHzw"
                    style="width: 100%; max-width: 60px"
                  />
                </td>
                <td class="date">
                  Date: ${date}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr class="information">
          <td colspan="2">
            <table>
              <tr>
                <td>Candidate's email: ${email}</td>
              </tr>
              <tr>
                <td>Position: ${level}</td>
              </tr>
            </table>
          </td>
        </tr>
        <div>
        ${questions
          .map((question, index) => {
            const answer = answers.find(
              (answer) => answer.questionId === question.id
            );
            return `
              <div key="${question.id}" class="item">
                <h4>${index + 1}. ${question.question}</h4>
                <p>${answer ? answer.answer : "no answer"}</p>
              </div>
              `;
          })
          .join("")} 
        </div>
    </div>
  </body>
</html>
    `;
};
