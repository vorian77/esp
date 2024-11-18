CREATE MIGRATION m1spa6nkjurfhnjxlc5wxdds2xfwsyoukdva43gvcmt4kmrer6ej3q
    ONTO m17mzlweo46l4duer2yvj6qjoecijpta3oktbnm2jtpgmlilbiiulq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customColCodeCor {
          RENAME TO customColCodeColor;
      };
  };
};
