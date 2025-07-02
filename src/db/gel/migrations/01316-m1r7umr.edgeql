CREATE MIGRATION m1r7umr3dj7sp5jg4nk5z6jb3cx6cn7usmbribqk4pa5ib3pprgc5a
    ONTO m16tgg45qbxvrtriuh42iv2db3cerprve473hupwk372li6y7pbrga
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      CREATE LINK codeTriggerType: sys_core::SysCode;
  };
};
