CREATE MIGRATION m1hmgxnp3mou5uyt55sixgtk45idq22ndd7kgfi6fckw4pdkfec7jq
    ONTO m1rt7q2yj37c65y36uqqhcik7rgfzbm7e6d7tkftbaekzznpqjvsqq
{
              ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY orderDisplay: default::nonNegative;
  };
};
