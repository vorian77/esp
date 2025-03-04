CREATE MIGRATION m17mzlweo46l4duer2yvj6qjoecijpta3oktbnm2jtpgmlilbiiulq
    ONTO m1gkcrsnbgr4fpqseu7yyhjsbichzuuwc633nse3fr7msnma22t4sa
{
              ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK customColCodeCor: sys_core::SysCode;
  };
};
