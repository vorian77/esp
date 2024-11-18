CREATE MIGRATION m1fnbyjhr2t7doqc2mkx2ms7aqxwhmbgp6cz42uk2dyscbmiesrxca
    ONTO m1eh2latjm2sywkx6lf4irqidbcaol6ljis7k4ibtqtqii6hkvs2ua
{
      ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK codeColor: sys_core::SysCode;
  };
};
