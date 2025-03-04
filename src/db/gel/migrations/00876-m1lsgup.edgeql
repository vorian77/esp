CREATE MIGRATION m1lsgupy3tbxw4m3oafak5vsbd5yl4wjgnxjptx5vuclp3l5rfhita
    ONTO m12odc2z5mvxrztb7ckzf3dcm64q4no5vt32mhwce7cbtlovy3cx6q
{
  ALTER TYPE default::SysPerson {
      ALTER LINK codeStateNew {
          RENAME TO codeState;
      };
  };
  ALTER TYPE default::SysPerson {
      ALTER PROPERTY addr1New {
          RENAME TO addr1;
      };
  };
  ALTER TYPE default::SysPerson {
      ALTER PROPERTY addr2New {
          RENAME TO addr2;
      };
  };
  ALTER TYPE default::SysPerson {
      ALTER PROPERTY avatarNew {
          RENAME TO avatar;
      };
  };
  ALTER TYPE default::SysPerson {
      ALTER PROPERTY cityNew {
          RENAME TO city;
      };
  };
  ALTER TYPE default::SysPerson {
      ALTER PROPERTY emailNew {
          RENAME TO email;
      };
  };
  ALTER TYPE default::SysPerson {
      ALTER PROPERTY noteNew {
          RENAME TO zip;
      };
  };
  ALTER TYPE default::SysPerson {
      DROP PROPERTY zipNew;
  };
};
