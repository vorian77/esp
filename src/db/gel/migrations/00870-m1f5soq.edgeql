CREATE MIGRATION m1f5soqf3cejbutwc2djndvobuezh4rajtp3b5xuye55m3t7jnuera
    ONTO m1jrr4yfiwmtx3gcsmenrbmtmuisr5clyeji634yhwtnvqt5hdmp7a
{
  ALTER TYPE app_cm::CmClient {
      ALTER LINK person {
          ON SOURCE DELETE ALLOW;
          SET REQUIRED USING (<default::SysPerson>{});
      };
  };
  ALTER TYPE sys_user::SysUser {
      ALTER LINK person {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          SET REQUIRED USING (<default::SysPerson>{});
      };
  };
};
