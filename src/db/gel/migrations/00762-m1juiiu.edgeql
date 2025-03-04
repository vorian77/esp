CREATE MIGRATION m1juiiukx2b42cq2ee4tabkzoaezzb724dnsg2a7zm37r4x5dsejwa
    ONTO m1kp4dalqlnpuabtcfaoabyraaixsyrgf5ess6zcjr5uwkb2owqbzq
{
          ALTER TYPE sys_core::SysDataObj {
      CREATE LINK codeDataObjType: sys_core::SysCode;
  };
};
