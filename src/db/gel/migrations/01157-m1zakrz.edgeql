CREATE MIGRATION m1zakrzxnnv2jjafce5gtmf3oknkwl44ham2pizciyqiqwro37ye4a
    ONTO m1amq25ribsqps7jt4fdoehsvw4v47uldbxszhitni2smejb5arl5q
{
  ALTER TYPE sys_core::ObjRoot {
      DROP PROPERTY testTextSelect;
  };
};
