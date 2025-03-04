CREATE MIGRATION m1fs2l32257pxdwx2fozntwwcatlsyvpuksc4g364ufhw26bkijaxa
    ONTO m1iqqqsicqcgv7uzu3vn3sbxcpkliypaaseavotk6345f3jbjtcqjq
{
          ALTER TYPE default::SysPerson {
      CREATE PROPERTY isLegalAgreed: std::bool;
  };
};
