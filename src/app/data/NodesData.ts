export default [
    {id: '1', name: 'Entry Point', alert: true, to: ['API1', 'API2', 'API3']},
    {id: 'API1', name: 'NodeJs', alert: true, to: ['MGUS1', 'MSSQL1']},
    {id: 'API2', name: 'Django', alert: false, to: ['SQL1']},
    {id: 'API3', name: 'Azure', alert: false, to: ['MDB1']},
    {id: 'MGUS1', name: 'Mongoose', alert: true, to: ['MDB2']},
    {id: 'MSSQL1', name: 'MSSQL', alert: true, to: ['SQL2']},
    {id: 'SQL1', name: 'MySQL', alert: false, to: []},
    {id: 'SQL2', name: 'MySQL', alert: true, to: []},
    {id: 'MDB1', name: 'MongoDB', alert: false, to: []},
    {id: 'MDB2', name: 'MongoDB', alert: true, to: []},
  ];
