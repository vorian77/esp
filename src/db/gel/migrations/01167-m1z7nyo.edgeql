CREATE MIGRATION m1z7nyogglyf37bto4p6iswjy6hh6ai5ypdbi6xhtqem4re7hcyzuq
    ONTO m1ycv6jhea47nonqxohgtdfvvpmn3hnuyd4dlw3m3v5re3pp7uvn2q
{
  ALTER TYPE sys_core::SysMsg {
      DROP PROPERTY createdAt;
  };
};
