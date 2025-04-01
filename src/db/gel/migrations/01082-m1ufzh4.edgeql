CREATE MIGRATION m1ufzh4pspjimpxwbghmal4xiypi4jlp2j7ofak37tkqx63ztbksra
    ONTO m1c7wbrnqcbprno5y6fcywskx6f73ubgqqmgi4jllegf3gdq5jqyga
{
  ALTER TYPE sys_core::SysMsg {
      ALTER PROPERTY subject {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
