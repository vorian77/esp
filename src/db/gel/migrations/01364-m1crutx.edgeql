CREATE MIGRATION m1crutxpav5d3lfwdsixcs54cier5yt2wxfza7rtglo7m6rwim7nqa
    ONTO m1dbopwsv4tiexuoqtyiqhu7x5dhdejculuq6jeeyjef6ugqgrdzfq
{
  ALTER TYPE sys_core::SysEligibilityNodeValue {
      ALTER PROPERTY value {
          RENAME TO valueBoolean;
      };
  };
};
