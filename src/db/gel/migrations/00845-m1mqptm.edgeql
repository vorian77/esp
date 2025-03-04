CREATE MIGRATION m1mqptm4trilk4jrv6qgt6ttbil4zg2esmr7wnhzpifzez5qtkugqa
    ONTO m1fs2l32257pxdwx2fozntwwcatlsyvpuksc4g364ufhw26bkijaxa
{
          ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customColRawHTML: std::str;
  };
};
