CREATE MIGRATION m1ehdyizxlav5klnb7gutptqq5apytdtodyitjearays7a6fqpqkea
    ONTO m1gwqitzwvkvzkzg7vnsvm474law5ijzs62kedozw77iwgwvta6uea
{
              ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY isSystemRootNode;
  };
};
