export default [
    {id: '1', name: 'Entry Point',address:'12314528-svsd-v',source: "CVE-2021-26424", alert: true, to: ['API1', 'API2', 'API3']},
    {id: 'API1', name: 'NodeJs',address:'12314528-svsd-v',source: "CVE-2021-26424", alert: true, to: ['MGUS1', 'MSSQL1']},
    {id: 'API2', name: 'Django',address:'12314528-svsd-v',source: "CVE-2021-26424", alert: false, to: ['SQL1','MGUS1']},
    {id: 'API3', name: 'Azure',address:'12314528-svsd-v',source: "CVE-2021-26424", alert: false, to: ['MDB1']},
    {id: 'MGUS1', name: 'Mongoose',address:'12314528-svsd-v',source: "CVE-2021-26424", alert: true, to: ['MDB2']},
    {id: 'MSSQL1', name: 'MSSQL',address:'12314528-svsd-v',source: "CVE-2021-26424", alert: true, to: ['SQL2']},
    {id: 'SQL1', name: 'MySQL',address:'12314528-svsd-v',source: "CVE-2021-26424", alert: false, to: []},
    {id: 'SQL2', name: 'MySQL',address:'12314528-svsd-v',source: "CVE-2021-26424", alert: false, to: []},
    {id: 'MDB1', name: 'MongoDB',address:'12314528-svsd-v',source: "CVE-2021-26424", alert: false, to: []},
    {id: 'MDB2', name: 'MongoDB',address:'12314528-svsd-v',source: "CVE-2021-26424", alert: true, to: []},
  ];
