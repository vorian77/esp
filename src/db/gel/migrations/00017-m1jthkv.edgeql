CREATE MIGRATION m1jthkvino32xehu4ztztmrxy75khlwwxpjvzom7xd7u4nf2hzeama
    ONTO m1rpqo6namhpdexccleia33npr5dexivgjq4aogaj7y5jhtsh5oe7q
{
  ALTER TYPE sys_core::SysDataObjStyle {
      ALTER PROPERTY exprTrigger {
          RESET OPTIONALITY;
      };
  };
};
