CREATE MIGRATION m1vucvht34pnue6guyexzrwrfr5cjcbmnoo264vtjlmgid3wryuaja
    ONTO m1cqygohsban5g3tehfqttiuvy4ytbqeszq72swpzeepikyfduynka
{
              ALTER TYPE sys_core::SysCode {
      ALTER LINK owner {
          SET REQUIRED USING (<sys_core::SysSystem>{});
      };
  };
};
