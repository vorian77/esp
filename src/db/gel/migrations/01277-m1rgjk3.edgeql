CREATE MIGRATION m1rgjk3eo7mrpddcgbmhfluvaosn3g5beme4rap2lqtsbbomrvjy4q
    ONTO m1ujv3kc7slpxnxlaetxesj6ekpsxs5btwqbo44sccfcl6t5shaarq
{
  ALTER TYPE sys_core::SysNodeObj {
      CREATE PROPERTY isRetrievePreset: std::bool;
  };
};
