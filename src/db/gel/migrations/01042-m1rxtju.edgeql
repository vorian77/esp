CREATE MIGRATION m1rxtjuda7krgal3coaaibruofl653geezr24wxntev66x6tmgl3dq
    ONTO m1fm5wrbgvq5o3bwa3egb4opsu44a23ax36nc72uui2dph5llseedq
{
  ALTER TYPE sys_core::SysMsg {
      DROP LINK readers;
  };
  ALTER TYPE sys_core::SysMsg {
      ALTER PROPERTY isRequestResponse {
          RENAME TO isOpen;
      };
  };
};
