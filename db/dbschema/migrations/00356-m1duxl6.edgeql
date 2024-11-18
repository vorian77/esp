CREATE MIGRATION m1duxl6z3xjczhg3sycesarevw2u3ajfw7m6qylmegvniwnotdcnwa
    ONTO m15ttkcrck65ootmr2povatbi2lx6zfixhxvmcd7nfgabfa4hj4loq
{
  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      CREATE PROPERTY exprAutoSelect: std::str;
  };
  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      DROP PROPERTY isAutoSelect;
  };
};
