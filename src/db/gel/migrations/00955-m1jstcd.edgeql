CREATE MIGRATION m1jstcdn64p77vvx6si7tpd336pzirmoafv3hgjuftk35mobqnhbkq
    ONTO m1qrzo7no3rau3ryrofbv7lmjk35bcru2gaisxk6clwfthwccj47ga
{
  ALTER TYPE sys_core::SysMsg {
      ALTER LINK codeStatus {
          RESET OPTIONALITY;
      };
      CREATE REQUIRED PROPERTY isRead: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
