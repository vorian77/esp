CREATE MIGRATION m13ftavfpdenatwg5wxp2illuvqxk5nzunali74si4hnvuqcp2hsoa
    ONTO m14k4rnmkb777va2iddpilivgfaf37k5sriy5pbtul2s7gozpv6lkq
{
  ALTER TYPE sys_core::ObjRoot {
      CREATE PROPERTY isGlobalResource: std::bool;
  };
};
