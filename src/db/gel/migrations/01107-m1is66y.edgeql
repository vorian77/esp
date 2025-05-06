CREATE MIGRATION m1is66ybf6pgzgrlh4utqqe5b2j2bi44jff5gealtmvis74mudgxkq
    ONTO m1lxjrvrcvklzxij6jxi7uqqn5ajm3bn3hjhfmxapti2h67pzkch6a
{
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY tempAttrAccessFilterNullValue;
  };
};
