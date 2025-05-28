CREATE MIGRATION m1e3gmadakx3xkmimybaosf5hpdln6weuur4edbolakcspppovfz4a
    ONTO m1xjamamltlupabhhdwzfh7dug7ckg2vtst3nlwi6xi62w6ctcqt2q
{
  ALTER TYPE default::SysPerson {
      DROP EXTENDING sys_core::ObjRootCore;
      EXTENDING sys_core::ObjRoot LAST;
  };
};
