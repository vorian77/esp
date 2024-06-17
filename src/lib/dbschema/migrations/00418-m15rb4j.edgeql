CREATE MIGRATION m15rb4jdxwkqkk5j4oogrxpo6nypceougwm5msxrkx6x5s4565ouia
    ONTO m1757s5sogbhkcxc375lpmcwsttpkqmqfmiwqnohqyrj33cbs7fh7q
{
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY processExprId;
  };
};
