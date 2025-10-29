import { act, renderHook } from "@testing-library/react";

import useDialog from "@/hooks/useDialog";

describe("useDialog", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useDialog());
    act(() => {
      result.current.closeDialog();
    });
  });

  describe("Initial state", () => {
    it("should have correct initial values", () => {
      const { result } = renderHook(() => useDialog());

      expect(result.current.isOpen).toBe(false);
      expect(result.current.type).toBeNull();
      expect(result.current.id).toBeUndefined();
    });
  });

  describe("openDialog", () => {
    it("should open dialog with type only", () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.openDialog("create-job");
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.type).toBe("create-job");
      expect(result.current.id).toBeUndefined();
    });

    it("should open dialog with type and id", () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.openDialog("edit-job", "job-123");
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.type).toBe("edit-job");
      expect(result.current.id).toBe("job-123");
    });

    it("should handle multiple dialog types", () => {
      const { result } = renderHook(() => useDialog());

      const dialogTypes = ["create", "edit", "delete", "view", "confirmation"];

      dialogTypes.forEach((type) => {
        act(() => {
          result.current.openDialog(type);
        });

        expect(result.current.isOpen).toBe(true);
        expect(result.current.type).toBe(type);
      });
    });

    it("should update dialog when opening with different type", () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.openDialog("first-dialog", "id-1");
      });

      expect(result.current.type).toBe("first-dialog");
      expect(result.current.id).toBe("id-1");

      act(() => {
        result.current.openDialog("second-dialog", "id-2");
      });

      expect(result.current.type).toBe("second-dialog");
      expect(result.current.id).toBe("id-2");
      expect(result.current.isOpen).toBe(true);
    });
  });

  describe("closeDialog", () => {
    it("should close dialog and reset state", () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.openDialog("test-dialog", "test-id");
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.closeDialog();
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.type).toBeNull();
      expect(result.current.id).toBeUndefined();
    });

    it("should handle closing already closed dialog", () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.closeDialog();
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.type).toBeNull();
      expect(result.current.id).toBeUndefined();
    });
  });

  describe("State persistence across renders", () => {
    it("should maintain state across multiple hook instances", () => {
      const { result: result1 } = renderHook(() => useDialog());
      const { result: result2 } = renderHook(() => useDialog());

      act(() => {
        result1.current.openDialog("shared-dialog", "shared-id");
      });

      expect(result2.current.isOpen).toBe(true);
      expect(result2.current.type).toBe("shared-dialog");
      expect(result2.current.id).toBe("shared-id");
    });

    it("should sync state when closed from another instance", () => {
      const { result: result1 } = renderHook(() => useDialog());
      const { result: result2 } = renderHook(() => useDialog());

      act(() => {
        result1.current.openDialog("test-dialog");
      });

      expect(result2.current.isOpen).toBe(true);

      act(() => {
        result2.current.closeDialog();
      });

      expect(result1.current.isOpen).toBe(false);
      expect(result2.current.isOpen).toBe(false);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty string as type", () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.openDialog("");
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.type).toBe("");
      expect(result.current.id).toBeUndefined();
    });

    it("should handle empty string as id", () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.openDialog("test", "");
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.type).toBe("test");
      expect(result.current.id).toBe("");
    });

    it("should handle special characters in type and id", () => {
      const { result } = renderHook(() => useDialog());
      const specialType = "test-dialog@#$%";
      const specialId = "id-123!@#$%^&*()";

      act(() => {
        result.current.openDialog(specialType, specialId);
      });

      expect(result.current.type).toBe(specialType);
      expect(result.current.id).toBe(specialId);
    });
  });

  describe("Rapid state changes", () => {
    it("should handle rapid open/close operations", () => {
      const { result } = renderHook(() => useDialog());

      for (let i = 0; i < 10; i++) {
        act(() => {
          result.current.openDialog(`dialog-${i}`, `id-${i}`);
          result.current.closeDialog();
        });
      }

      expect(result.current.isOpen).toBe(false);
      expect(result.current.type).toBeNull();
      expect(result.current.id).toBeUndefined();
    });

    it("should handle rapid dialog type switching", () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.openDialog("dialog-1", "id-1");
        result.current.openDialog("dialog-2", "id-2");
        result.current.openDialog("dialog-3", "id-3");
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.type).toBe("dialog-3");
      expect(result.current.id).toBe("id-3");
    });
  });
});
