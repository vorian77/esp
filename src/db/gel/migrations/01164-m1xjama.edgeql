CREATE MIGRATION m1xjamamltlupabhhdwzfh7dug7ckg2vtst3nlwi6xi62w6ctcqt2q
    ONTO m1v6yi5bhrfstktwjx7nly7sqqidpx5el2ixcn5y5zotcgpgtsdizq
{
  ALTER TYPE default::SysPerson {
      DROP EXTENDING sys_core::ObjRoot;
      EXTENDING sys_core::ObjRootCore LAST;
  };
};
