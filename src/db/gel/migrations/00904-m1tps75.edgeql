CREATE MIGRATION m1tps75oes2yf6rrf62cybj3npggx6e4wdkig4kb6vb4vzqegjnhga
    ONTO m1v5gdjsan4hgjh33ausns2hgahrwsjkh763g6g36bhd32dfdna3sq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY exprSave: std::str;
  };
};
