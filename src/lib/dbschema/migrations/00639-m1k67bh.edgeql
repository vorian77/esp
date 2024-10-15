CREATE MIGRATION m1k67bhccrfnav57eqlfdb4bsnnciadvyx54y7yirygjyeympuxt5a
    ONTO m1macnch4y525rj5as3w6jjqwzoqmolwtkm4dkdbip4mjxjmh3aqjq
{
  ALTER TYPE app_cm::CmClient {
      ALTER LINK owner {
          SET REQUIRED USING (<sys_core::SysSystem>{});
      };
  };
};
