CREATE MIGRATION m1bwgnwgsf6krr73wx35ngbvecnehtfmpxmxjppxr4zf7x4ubf7vrq
    ONTO m1ybxatj6z72ebbuhdtdhixromrdvaf3dmcrbktq7bfwim3wsmxgfa
{
  ALTER TYPE sys_core::SysObjDb {
      CREATE PROPERTY exprFilterCurrentRecords: std::str;
      CREATE PROPERTY exprFilterCurrentValue: std::str;
  };
};
