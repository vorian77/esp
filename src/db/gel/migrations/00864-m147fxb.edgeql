CREATE MIGRATION m147fxb7arsop3x6aotaye2s6uunu67emndxgnscfusqfd5e65tw5q
    ONTO m1kyyuffcrmy27h6losm2gvgdaxrpanlwp4mni7upcefxshktc7q6q
{
  ALTER TYPE sys_core::SysObjEnt {
      CREATE LINK codeStateNew: sys_core::SysCode;
      CREATE PROPERTY addr1New: std::str;
      CREATE PROPERTY addr2New: std::str;
      CREATE PROPERTY cityNew: std::str;
      CREATE PROPERTY emailNew: std::str;
      CREATE PROPERTY websiteNew: std::str;
      CREATE PROPERTY zipNew: std::str;
      ALTER LINK codeState {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY addr1 {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY addr2 {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY city {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY email {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY website {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY zip {
          DROP OWNED;
          RESET TYPE;
      };
  };
};
