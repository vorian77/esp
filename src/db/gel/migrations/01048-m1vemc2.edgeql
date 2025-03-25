CREATE MIGRATION m1vemc25eex3igs3p34tf5kjy4zoci6piyjapl3mcf7trb7fnr7gja
    ONTO m1xfmxj6einmsd6vy4qnulyixsp2h26zlsh2uhspflbomgiitqiufa
{
  ALTER TYPE sys_core::ObjRoot {
      ALTER LINK attributes {
          RENAME TO attrsAccess;
      };
  };
  ALTER TYPE sys_core::ObjRoot {
      CREATE MULTI LINK attrs: sys_core::SysAttr;
  };
};
