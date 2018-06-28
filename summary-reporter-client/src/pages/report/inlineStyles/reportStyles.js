const reportStyles = `.report {
  font-size: 14px;
  width: 960px;
  height: 600px;
  margin: 28px auto 42px auto;
  padding: 10px;
  border: 1px solid #000;
}

.report * {
  border-collapse: collapse;
  border: 1px solid #000;
}

.report__table {
  height: 525px;
  width: 100%;
}

.report__title {
  font-weight: bold;
}

.report__header td,
.report th {
  text-align: left;
  padding-left: 3px;
}

.report__column-labels th {
  text-align: center;
}

.report__body {
  text-align: center;
}

.report__body-labels {
  font-weight: 300;
  width: 25%;
}

.report__footer {
  height: 35px;
  display: flex;
  padding: 5px;
}

.report__footer > * {
  border: none;
  flex-grow: 1;
}

@media print {
  .util--no-print {
    display: none;
  }

  .report {
    margin: 0;
    margin-top: 50px;
  }

  .report__table {
    height: 535px;
  }

  .report:not(:last-child) {
    page-break-after: always;
  }
}`;

export default reportStyles;
