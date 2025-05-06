CREATE MIGRATION m1dp2bb5jbbfe4g6vpln66mwymzgmgk6dblznas3bjaxvgfpvodzfa
    ONTO m1shitziva6wxkbpohnvhtuqenbbixifhnjk7cgyledadc73n32nda
{
  ALTER TYPE default::SysError {
      ALTER PROPERTY errCode {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY errFile {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY errFunction {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY errMsgSystem {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
