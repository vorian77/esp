CREATE MIGRATION m1qrzo7no3rau3ryrofbv7lmjk35bcru2gaisxk6clwfthwccj47ga
    ONTO m1fzge43gpcuns7mncrunkyuucpoamotrryf6pggiik556ssenenxa
{
  ALTER TYPE sys_core::SysMsg {
      ALTER LINK recipients {
          SET TYPE default::SysPerson USING (.recipients[IS default::SysPerson]);
      };
      ALTER LINK sender {
          SET TYPE default::SysPerson USING (.sender[IS default::SysPerson]);
      };
  };
};
