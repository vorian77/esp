CREATE MIGRATION m1rl6j2gwihfdgdx7qzelbope4kc3npbqz5hjjdj7c7bbik32pfyaa
    ONTO m16icnop6tpg6ten3d46ayfz4wae53mvy3im7hkjuvvynqcmiwwxpa
{
                  ALTER TYPE sys_core::SysCode {
      ALTER PROPERTY order {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE sys_core::SysCodeType {
      ALTER PROPERTY order {
          RESET OPTIONALITY;
      };
  };
};
