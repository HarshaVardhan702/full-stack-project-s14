# Upgrade Plan: certifypro-backend (20260330072103)

- **Generated**: 2026-03-30 12.52.57 +05:30
- **HEAD Branch**: appmod/java-upgrade-20260327070526
- **HEAD Commit ID**: 8a34603

## Available Tools

**JDKs**
- JDK 21.0.7: C:\Program Files\Java\jdk-21\bin (baseline/build verification step)
- JDK 25.0.2: C:\Users\sayya\.jdk\jdk-25\bin (target runtime and final validation)

**Build Tools**
- Maven 3.9.14: C:\Users\sayya\scoop\apps\maven\3.9.14\bin
- Maven latest: **<TO_BE_UPGRADED>** (required by Step 1 for Java 25 target validation)

## Guidelines

- Upgrade Java runtime to the latest LTS version.

> Note: You can add any specific guidelines or constraints for the upgrade process here if needed, bullet points are preferred.

## Options

- Working branch: appmod/java-upgrade-20260330072103
- Run tests before and after the upgrade: true

## Upgrade Goals

 - Upgrade Java from 17 to 25 (latest LTS).

### Technology Stack

| Technology/Dependency | Current | Min Compatible | Why Incompatible |
| --------------------- | ------- | -------------- | ---------------- |
| Java | 17 | 25 | User requested latest LTS runtime |
| Spring Boot | 3.2.3 | 3.5.0 | Upgrade to a newer line to reduce Java 25 compatibility risk |
| Maven | 3.9.14 | latest available (4.x preferred for Java 25) | Upgrade planned to align with Java 25 toolchain expectations |
| maven-compiler-plugin | spring-boot managed | 3.14.x | Explicit plugin pin avoids compiler drift when targeting Java 25 |
| maven-surefire-plugin | spring-boot managed | 3.5.x | Newer test plugin improves JDK 25 execution compatibility |
| jjwt | 0.12.5 | 0.12.5 | - |
| Lombok | spring-boot managed | spring-boot managed | - |

### Derived Upgrades

- Upgrade Spring Boot from 3.2.3 to 3.5.0 to align the framework/tooling baseline with Java 25 runtime targets.
- Upgrade Maven to latest available release in Step 1 because Java 25 build/test validation is sensitive to build tool compatibility.
- Add explicit `maven-compiler-plugin` (3.14.1) with `<release>25</release>` so source/target behavior is deterministic on JDK 25.
- Add explicit `maven-surefire-plugin` (3.5.1) to reduce JDK 25 test runtime incompatibilities.

## Upgrade Steps

- **Step 1: Setup Environment**
  - **Rationale**: Ensure Java 25 and a compatible Maven executable are available before any code changes.
  - **Changes to Make**:
    - [ ] Install/upgrade Maven to latest available release
    - [ ] Confirm JDK 25 path is valid and usable
    - [ ] Capture selected tool paths for execution phase
  - **Verification**:
    - Command: `appmod-list-jdks`, `appmod-list-mavens`
    - Expected: JDK 25 and upgraded Maven detected

- **Step 2: Setup Baseline**
  - **Rationale**: Establish current compile/test baseline before upgrade changes.
  - **Changes to Make**:
    - [ ] Run baseline compile for main+test code
    - [ ] Run baseline full test suite and record pass/fail
  - **Verification**:
    - Command: `mvn clean test-compile -q` and `mvn clean test -q`
    - JDK: C:\Program Files\Java\jdk-21\bin
    - Expected: Baseline compile status and baseline test pass rate documented

- **Step 3: Upgrade Runtime and Build Configuration**
  - **Rationale**: Apply the minimum required code/config changes to target Java 25 runtime.
  - **Changes to Make**:
    - [ ] Update `java.version` from 17 to 25 in `pom.xml`
    - [ ] Upgrade `spring-boot-starter-parent` from 3.2.3 to 3.5.0
    - [ ] Add explicit `maven-compiler-plugin` and `maven-surefire-plugin` versions for Java 25
    - [ ] Resolve any resulting compilation issues
  - **Verification**:
    - Command: `mvn clean test-compile -q`
    - JDK: C:\Users\sayya\.jdk\jdk-25\bin
    - Expected: Compilation succeeds for both production and test sources

- **Step 4: Final Validation**
  - **Rationale**: Confirm upgrade goals are fully met and test suite passes.
  - **Changes to Make**:
    - [ ] Verify final target versions in `pom.xml`
    - [ ] Run clean compile with Java 25 and fix any remaining issues
    - [ ] Run full tests and fix all failures until 100% pass
  - **Verification**:
    - Command: `mvn clean test -q`
    - JDK: C:\Users\sayya\.jdk\jdk-25\bin
    - Expected: Compilation success + 100% tests passing

## Key Challenges

- **Java 25 Toolchain Compatibility**
  - **Challenge**: Older Maven/plugin versions may compile but fail under test runtime on newer JDKs.
  - **Strategy**: Upgrade Maven and explicitly pin compiler/surefire plugin versions before final validation.

- **Framework Compatibility Envelope**
  - **Challenge**: Spring Boot 3.2.x may not be the safest baseline for Java 25.
  - **Strategy**: Move to Spring Boot 3.5.0 during runtime upgrade to reduce incompatibility risk.

- **Baseline Stability**
  - **Challenge**: Existing tests might already fail before upgrade, affecting acceptance criteria.
  - **Strategy**: Record baseline test results first, then require post-upgrade pass rate >= baseline and target 100% pass.
