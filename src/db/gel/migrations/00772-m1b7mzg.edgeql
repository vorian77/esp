CREATE MIGRATION m1b7mzgphiddlzmkm5ukbdjmgmqgkwjna2szaw42j7robe7acv2d4a
    ONTO m1ifavg6jjwo4zlhodmxyzcvpell33e4rwpcerxzt4odswqzsq7xsa
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER LINK props {
          SET MULTI;
      };
  };
};
