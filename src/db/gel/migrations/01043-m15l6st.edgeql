CREATE MIGRATION m15l6stjapnn7gjd36wv2lbpbj6raq65tfz2ywy66fazlp2oj3ll2q
    ONTO m1rxtjuda7krgal3coaaibruofl653geezr24wxntev66x6tmgl3dq
{
  ALTER TYPE sys_core::SysMsg {
      ALTER PROPERTY isOpen {
          SET default := true;
      };
  };
};
