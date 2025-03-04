CREATE MIGRATION m1kyyuffcrmy27h6losm2gvgdaxrpanlwp4mni7upcefxshktc7q6q
    ONTO m1ka36pz7i6bhf5wo5x52otycjqtt52bir5kgi4doitiocqa5yj5xq
{
  ALTER TYPE default::SysPerson {
      CREATE LINK codeStateNew: sys_core::SysCode;
      CREATE PROPERTY addr1New: std::str;
      CREATE PROPERTY addr2New: std::str;
      ALTER PROPERTY avatar {
          DROP OWNED;
          RESET TYPE;
      };
      CREATE PROPERTY avatarNew: std::json;
      CREATE PROPERTY cityNew: std::str;
      ALTER PROPERTY email {
          DROP OWNED;
          RESET TYPE;
      };
      CREATE PROPERTY emailNew: std::str;
      CREATE PROPERTY noteNew: std::str;
      CREATE PROPERTY websiteNew: std::str;
      ALTER PROPERTY zip {
          DROP OWNED;
          RESET TYPE;
      };
      CREATE PROPERTY zipNew: std::str;
  };
};
