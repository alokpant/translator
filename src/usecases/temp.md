Business logic (e.g., fetchAndTranslateSms)

Why Organize It This Way?

- Reusability: If you add support for other apps (e.g., WhatsApp), you can reuse the same FetchSmsUseCase with different repository implementations.
- Maintainability: Keeping platform-specific code in the infrastructure layer ensures a clean separation from business logic.