CREATE MIGRATION m1amq25ribsqps7jt4fdoehsvw4v47uldbxszhitni2smejb5arl5q
    ONTO m1l7fyxve3zwqb45jc7rzrb7d4dxr52iymu7pf4hc4u5tc6rewch6a
{
  ALTER TYPE sys_core::ObjRoot {
      CREATE PROPERTY testTextSelect: std::str;
  };
};
