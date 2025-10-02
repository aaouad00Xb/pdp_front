# Bilingual Fields Implementation - Arabic/French Database Support

## Overview
This implementation extends the PDP application to support bilingual data storage and display, allowing users to toggle between French and Arabic content dynamically.

## Database Changes

### 1. Entity Updates (`PDP_DATA.java`)
Added Arabic fields to the main entity:
```java
@Column(columnDefinition = "Text")
private String axes_ar;

@Column(columnDefinition = "Text") 
private String objectif_ar;

@Column(columnDefinition = "Text")
private String projet_action_ar;
```

### 2. DTO Updates (`PDP_DTO.java`)
Extended the DTO to include Arabic fields with proper validation and Swagger documentation:
```java
@Schema(description = "Strategic axes in Arabic")
private String axes_ar;

@Schema(description = "Objective in Arabic") 
private String objectif_ar;

@Schema(description = "Project/Action in Arabic")
private String projet_action_ar;
```

## Backend API Changes

### 1. Repository Layer (`PDP_repository.java`)
Added new query methods for Arabic data:
```java
@Query(value = "select distinct axes_ar from pdp_data WHERE axes_ar IS NOT NULL", nativeQuery = true)
List<String> axesAr();

@Query("SELECT DISTINCT p.objectif_ar FROM PDP_DATA p WHERE p.axes_ar IN ?1 AND p.objectif_ar IS NOT NULL")
List<String> findDistinctObjectifsByAxesAr(List<String> axesAr);
```

### 2. Service Layer (`PDP_DATAService.java`)
Implemented Arabic-specific service methods:
```java
@Override
public List<String> getDistinctAxesAr() {
    return pdpDataRepository.axesAr();
}

@Override  
public List<String> findDistinctObjectifsByAxesAr(List<String> axesAr) {
    return pdpDataRepository.findDistinctObjectifsByAxesAr(axesAr);
}
```

### 3. Controller Layer (`PDP_DATAController.java`)
Added new API endpoints for Arabic data:
```java
@GetMapping("/axes-ar")
public List<String> getDistinctAxesAr() {
    return pdpDataService.getDistinctAxesAr();
}

@GetMapping("/objectifs-ar")
public List<String> findDistinctObjectifsByAxesAr(@RequestParam List<String> axesAr) {
    return pdpDataService.findDistinctObjectifsByAxesAr(axesAr);
}
```

## Frontend Changes

### 1. Service Layer Updates (`service.service.ts`)
Added methods to fetch Arabic data:
```typescript
public axesAr(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/pdp_data/axes-ar`)
}

public findDistinctObjectifsByAxesAr(axesAr: string[]): Observable<string[]> {
    const url = `${this.apiUrl}/pdp_data/objectifs-ar`;
    return this.httpClient.get<string[]>(url, { params: { axesAr: axesAr } });
}
```

### 2. Language-Aware Data Service (`language-data.service.ts`)
Created a new service to handle language-specific data operations:
- `getAxes()`: Returns axes in current language
- `getObjectivesByAxes()`: Returns objectives in current language
- `getLocalizedField()`: Gets appropriate field based on language
- `transformDataForCurrentLanguage()`: Transforms data arrays for display

### 3. Component Updates
Updated both Dashboard and Editor components to:
- Use `LanguageDataService` for data fetching
- Subscribe to language changes
- Transform data for appropriate language display
- Show Arabic fields when Arabic is selected, French fields when French is selected

## Key Features

### 1. Dynamic Language Switching
- When user toggles to Arabic: Shows `axes_ar`, `objectif_ar`, `projet_action_ar` fields
- When user toggles to French: Shows `axes`, `objectif`, `projet_action` fields
- Automatic fallback to French if Arabic translation is not available

### 2. Reactive Data Updates
- Data automatically updates when language is changed
- No page refresh required
- Maintains current filters and selections

### 3. Bilingual Editing
- Editor component supports viewing data in both languages
- Edit forms still use French fields (for data consistency)
- Display shows appropriate language based on toggle

### 4. API Endpoints

#### New Arabic Endpoints:
- `GET /pdp_data/axes-ar` - Get distinct Arabic axes
- `GET /pdp_data/objectifs-ar?axesAr=...` - Get Arabic objectives by Arabic axes

#### Existing Endpoints (Enhanced):
- All existing endpoints now return Arabic fields in the response
- Frontend decides which fields to display based on language setting

## Database Migration

### Required SQL Updates:
1. Add new columns to existing table:
```sql
ALTER TABLE pdp_data ADD COLUMN axes_ar TEXT;
ALTER TABLE pdp_data ADD COLUMN objectif_ar TEXT; 
ALTER TABLE pdp_data ADD COLUMN projet_action_ar TEXT;
```

2. Populate with Arabic translations (see `sample_arabic_data.sql`)

## Usage Examples

### In Templates:
```html
<!-- Display appropriate language field -->
<td>{{item.displayAxes || item.axes}}</td>
<td>{{item.displayObjectif || item.objectif}}</td>
<td>{{item.displayProjetAction || item.projet_action}}</td>
```

### In Components:
```typescript
// Get axes in current language
this.languageDataService.getAxes().subscribe(axes => {
    this.axes = axes;
});

// Transform data for current language
this.data = this.languageDataService.transformDataForCurrentLanguage(rawData);
```

## Data Flow

1. **Language Toggle**: User clicks language toggle
2. **Service Update**: `TranslationService` updates current language
3. **Data Refresh**: Components subscribed to language changes refresh their data
4. **API Calls**: Appropriate API endpoints called based on language
5. **Display Update**: UI shows data in selected language

## Fallback Strategy

- If Arabic field is empty/null → Show French field
- If Arabic API returns empty → Fall back to French API
- Ensures no blank content is displayed to users

## Performance Considerations

- Arabic data is fetched only when Arabic language is selected
- Data transformation is done client-side for better performance
- Subscriptions are properly managed to prevent memory leaks

## Testing

### Manual Testing Steps:
1. Start application in French (default)
2. Verify French data displays correctly
3. Toggle to Arabic using language selector
4. Verify Arabic data displays (where available)
5. Verify fallback to French for untranslated content
6. Test filtering and search functionality in both languages
7. Test editor component in both languages

### API Testing:
```bash
# Test Arabic axes endpoint
curl http://localhost:8052/pdp_data/axes-ar

# Test Arabic objectives endpoint  
curl "http://localhost:8052/pdp_data/objectifs-ar?axesAr=محاربة جميع أشكال الهشاشة الاجتماعية"
```

## Future Enhancements

1. **Admin Interface**: Add interface for managing Arabic translations
2. **Bulk Translation**: Import/export functionality for translations
3. **Translation Validation**: Ensure all records have Arabic translations
4. **Search Enhancement**: Support Arabic text search and filtering
5. **RTL Improvements**: Enhanced right-to-left layout optimizations

## Maintenance Notes

- When adding new French data, remember to add corresponding Arabic translations
- Arabic translations should be reviewed by native speakers for accuracy
- Consider using professional translation services for official content
- Regular audits to ensure translation completeness
