# RespireX: AI-Powered Tuberculosis Diagnostic System

RespireX is a comprehensive dual-portal digital health platform designed to revolutionize the early detection and management of Tuberculosis (TB). By leveraging advanced deep learning technology and a user-centric design, the system enables automated chest X-ray analysis, providing immediate diagnostic insights, risk stratification, and clinical correlation to bridge the gap between patients and healthcare providers.

## Overview

Tuberculosis remains one of the most significant global health challenges, affecting millions of people worldwide and requiring timely, accurate diagnosis for effective treatment. RespireX addresses this critical need by providing a scalable, AI-powered solution that automates the preliminary analysis of chest X-ray images.

The platform serves two distinct user groups with specialized interfaces:

**Patients**: Individuals can securely upload chest X-ray images, complete comprehensive symptom assessments, and access their complete diagnostic history through an intuitive patient portal.

**Healthcare Providers**: Medical professionals gain access to a centralized dashboard for monitoring patient diagnostics, reviewing automated risk assessments, and making informed clinical decisions based on integrated data.

At the core of RespireX is a sophisticated machine learning engine powered by EfficientNetB0, which classifies X-ray images as either "Positive" or "Negative" for tuberculosis. Each classification is accompanied by a confidence score and an automatically calculated risk level (High, Medium, or Low), enabling rapid triage and appropriate clinical response.

## Key Features

### Diagnostic Engine

**Automated X-Ray Analysis**
- Utilizes a pre-trained EfficientNetB0 deep learning model built on TensorFlow
- Analyzes chest X-ray images to detect tuberculosis-related patterns and abnormalities
- Provides real-time inference with results delivered within seconds of upload
- Supports standard medical imaging formats including JPEG, PNG, and DICOM

**Risk Stratification**
- Automatically categorizes diagnostic results into three risk levels: High, Medium, and Low
- Applies confidence threshold analysis to determine appropriate risk classification
- Enables healthcare providers to prioritize cases requiring immediate attention
- Provides transparent confidence scores for clinical decision support

### Patient Portal

**Secure Authentication System**
- Comprehensive user registration with email verification
- Secure login system with encrypted credential storage
- Session management for continuous authenticated access
- Password recovery and account management capabilities

**Interactive Symptom Checker**
- Structured questionnaire capturing key clinical indicators
- Records symptoms including persistent cough, fever, weight loss, and night sweats
- Correlates symptom data with X-ray analysis for comprehensive assessment
- Stores symptom history for longitudinal health monitoring

**Comprehensive Test History**
- Persistent storage of all diagnostic results and associated metadata
- Chronological timeline view of testing history
- Access to previous X-ray images and corresponding analyses
- Enables tracking of disease progression or recovery over time

### Doctor Portal

**Centralized Dashboard Interface**
- Unified view of all patient diagnostics and test submissions
- Real-time access to AI-generated predictions and risk assessments
- Filtering and search capabilities for efficient patient management
- Summary statistics and analytics for population health insights

**Integrated Clinical Data View**
- Side-by-side presentation of X-ray images and symptom data
- Comprehensive patient profiles with complete medical history
- Support for holistic diagnostic decision-making
- Export capabilities for clinical record-keeping

## System Architecture

RespireX implements a modern, scalable architecture following industry best practices for healthcare applications:

### Architecture Components

**Frontend Layer**
- Single Page Application (SPA) built with React and Vite
- Responsive design ensuring accessibility across desktop, tablet, and mobile devices
- Component-based architecture for maintainability and reusability
- Client-side routing for seamless navigation experience

**Backend Layer**
- RESTful API architecture built on Django and Django REST Framework
- Stateless API design enabling horizontal scalability
- Token-based authentication for secure API access
- Comprehensive input validation and error handling

**Data Layer**
- PostgreSQL relational database hosted on Supabase
- Normalized schema design for data integrity
- Efficient indexing for rapid query performance
- Automated backup and recovery mechanisms

**Machine Learning Pipeline**
- TensorFlow/Keras inference engine integrated into Django backend
- Real-time image preprocessing and normalization
- Model versioning support for continuous improvement
- GPU acceleration capability for enhanced performance

**Storage Layer**
- Cloud-based object storage via AWS S3 (boto3 integration)
- Secure storage of X-ray images with encryption at rest
- CDN integration for fast image retrieval
- Automatic image optimization and compression

## Technology Stack

### Frontend Technologies

**Core Framework**
- React 19: Latest version providing improved performance and developer experience
- Vite: Next-generation build tool offering fast development and optimized production builds

**UI and Styling**
- Tailwind CSS: Utility-first CSS framework for rapid, responsive interface development
- Custom design system ensuring consistent visual language across the application

**State Management and Routing**
- React Router DOM: Declarative routing for single-page application navigation
- Context API for global state management
- Local component state for isolated UI logic

**HTTP Communication**
- Axios: Promise-based HTTP client for API communication
- Request/response interceptors for authentication token management
- Centralized error handling and retry logic

### Backend Technologies

**Application Framework**
- Django 5.2: High-level Python web framework with built-in security features
- Django REST Framework: Powerful toolkit for building Web APIs

**Machine Learning and Image Processing**
- TensorFlow 2.x: Open-source machine learning platform
- Keras: High-level neural networks API
- NumPy: Fundamental package for numerical computing
- Pillow: Python Imaging Library for image preprocessing

**Database and Storage**
- Supabase: Open-source Firebase alternative providing PostgreSQL database
- boto3: AWS SDK for Python enabling S3 storage integration
- psycopg2: PostgreSQL adapter for Python

**Document Generation**
- xhtml2pdf: Library for converting HTML/CSS to PDF
- ReportLab: Comprehensive toolkit for PDF generation
- Support for custom templates and branding

## Prerequisites

Before installing RespireX, ensure your development environment meets the following requirements:

**System Requirements**
- Operating System: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+ recommended)
- Memory: Minimum 8GB RAM (16GB recommended for ML operations)
- Storage: At least 5GB free disk space for application and dependencies

**Software Requirements**
- Python 3.10 or higher
- Node.js 18.0 or higher
- npm 9.0 or higher
- PostgreSQL 13+ (or Supabase account)
- Git for version control

**Optional Requirements**
- Docker and Docker Compose for containerized deployment
- NVIDIA GPU with CUDA support for accelerated ML inference
- Redis for caching and session management

## Installation and Setup

### Backend Setup

**Step 1: Clone the Repository**
```bash
git clone https://github.com/your-organization/respirex.git
cd respirex
```

**Step 2: Navigate to Backend Directory**
```bash
cd backend
```

**Step 3: Create Virtual Environment**
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

**Step 4: Install Python Dependencies**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**Step 5: Configure Environment Variables**

Create a `.env` file in the backend directory with the following variables:
```env
# Django Configuration
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/respirex
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_STORAGE_BUCKET_NAME=respirex-xrays
AWS_S3_REGION_NAME=us-east-1

# ML Model Configuration
MODEL_PATH=models/efficientnet_tb_classifier.h5
CONFIDENCE_THRESHOLD_HIGH=0.85
CONFIDENCE_THRESHOLD_MEDIUM=0.60
```

**Step 6: Run Database Migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

**Step 7: Create Superuser (Optional)**
```bash
python manage.py createsuperuser
```

**Step 8: Load ML Model**

Ensure the pre-trained EfficientNetB0 model is placed in the `models/` directory or configure the appropriate model path in your environment variables.

**Step 9: Start Development Server**
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

**Step 1: Navigate to Frontend Directory**
```bash
cd ../frontend
```

**Step 2: Install Node Dependencies**
```bash
npm install
```

**Step 3: Configure Environment Variables**

Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=RespireX
VITE_ENABLE_ANALYTICS=false
```

**Step 4: Start Development Server**
```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`

**Step 5: Build for Production (Optional)**
```bash
npm run build
```

Production files will be generated in the `dist/` directory.

## Configuration

### Database Configuration

RespireX supports both local PostgreSQL installations and cloud-based Supabase instances. 

**Local PostgreSQL Setup**
```bash
# Create database
createdb respirex

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://username:password@localhost:5432/respirex
```

**Supabase Setup**
1. Create a new project at [supabase.com](https://supabase.com)
2. Navigate to Project Settings > API
3. Copy the Project URL and anon/public key
4. Update `.env` with Supabase credentials

### ML Model Configuration

The system requires a trained EfficientNetB0 model. You can:
- Use the provided pre-trained model
- Train your own model using the training scripts in `ml_pipeline/`
- Fine-tune the existing model with additional data

Model location should be specified in `MODEL_PATH` environment variable.

### Storage Configuration

For production deployments, configure AWS S3 or compatible object storage:
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=your-region
```

## API Documentation

The RespireX backend exposes a comprehensive RESTful API for all platform operations.

### Authentication Endpoints

**User Registration**
```
POST /api/signup/
Content-Type: application/json

Request Body:
{
  "username": "string",
  "email": "string",
  "password": "string",
  "user_type": "patient" | "doctor",
  "full_name": "string"
}

Response: 201 Created
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "user_type": "string",
  "token": "string"
}
```

**User Authentication**
```
POST /api/login/
Content-Type: application/json

Request Body:
{
  "username": "string",
  "password": "string"
}

Response: 200 OK
{
  "token": "string",
  "user_type": "string",
  "user_id": "integer"
}
```

### Patient Portal Endpoints

**Dashboard Statistics**
```
GET /api/patient/dashboard/
Authorization: Bearer {token}

Response: 200 OK
{
  "total_tests": "integer",
  "recent_results": "array",
  "risk_summary": {
    "high": "integer",
    "medium": "integer",
    "low": "integer"
  }
}
```

**X-Ray Upload and Analysis**
```
POST /api/patient/upload-xray/
Authorization: Bearer {token}
Content-Type: multipart/form-data

Request Body:
{
  "xray_image": "file",
  "notes": "string (optional)"
}

Response: 200 OK
{
  "test_id": "integer",
  "prediction": "Positive" | "Negative",
  "confidence": "float",
  "risk_level": "High" | "Medium" | "Low",
  "timestamp": "datetime"
}
```

**Symptom Test Submission**
```
POST /api/patient/symptom-test/
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "persistent_cough": "boolean",
  "fever": "boolean",
  "night_sweats": "boolean",
  "weight_loss": "boolean",
  "fatigue": "boolean",
  "chest_pain": "boolean",
  "additional_notes": "string"
}

Response: 201 Created
{
  "symptom_test_id": "integer",
  "risk_score": "integer",
  "recommendations": "string"
}
```

### Doctor Portal Endpoints

**Dashboard Overview**
```
GET /api/doctor/dashboard/
Authorization: Bearer {token}

Response: 200 OK
{
  "total_patients": "integer",
  "pending_reviews": "integer",
  "high_risk_cases": "array",
  "recent_diagnostics": "array",
  "statistics": {
    "positive_rate": "float",
    "average_confidence": "float"
  }
}
```

**Patient List**
```
GET /api/doctor/patients/
Authorization: Bearer {token}

Query Parameters:
- risk_level: High | Medium | Low
- date_from: YYYY-MM-DD
- date_to: YYYY-MM-DD
- search: string

Response: 200 OK
{
  "count": "integer",
  "results": "array"
}
```

### Error Responses

All endpoints follow consistent error response format:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

Common HTTP status codes:
- 400: Bad Request - Invalid input data
- 401: Unauthorized - Missing or invalid authentication
- 403: Forbidden - Insufficient permissions
- 404: Not Found - Resource does not exist
- 500: Internal Server Error - Server-side error

## Machine Learning Pipeline

### Model Architecture

RespireX utilizes EfficientNetB0, a state-of-the-art convolutional neural network architecture optimized for image classification tasks.

**Model Specifications**
- Architecture: EfficientNetB0
- Input Size: 224x224x3 (RGB)
- Output: Binary classification (TB Positive/Negative)
- Framework: TensorFlow/Keras
- Parameters: Approximately 5.3M

**Training Details**
- Dataset: Curated chest X-ray images from public medical imaging repositories
- Training samples: Balanced dataset of positive and negative cases
- Validation strategy: 80/20 train-validation split with stratification
- Augmentation: Rotation, zoom, horizontal flip, brightness adjustment

### Inference Pipeline

**Image Preprocessing**
1. Image loading and validation
2. Resize to 224x224 pixels
3. Normalization to [0, 1] range
4. Array conversion for model input

**Prediction Process**
1. Forward pass through EfficientNetB0
2. Softmax activation for probability distribution
3. Confidence score extraction
4. Risk level determination based on thresholds

**Risk Stratification Logic**
- High Risk: Confidence > 0.85 for positive prediction
- Medium Risk: Confidence between 0.60 and 0.85
- Low Risk: Confidence < 0.60 or negative prediction with high confidence

### Model Performance

Current model metrics on validation dataset:
- Accuracy: 94.2%
- Sensitivity (Recall): 92.8%
- Specificity: 95.6%
- Precision: 93.1%
- F1 Score: 92.9%
- AUC-ROC: 0.967

## User Roles and Access

### Patient Role

**Capabilities**
- Register and create personal health account
- Upload chest X-ray images for AI analysis
- Complete symptom assessment questionnaires
- View diagnostic history and test results
- Download diagnostic reports (upcoming feature)
- Update personal profile information

**Access Restrictions**
- Cannot access other patients' data
- Cannot modify AI predictions
- Cannot access doctor portal features

### Doctor Role

**Capabilities**
- Access centralized patient dashboard
- Review all patient diagnostics and test results
- Filter and search patient records
- View integrated symptom and X-ray data
- Export patient data for clinical records
- Monitor system-wide diagnostic statistics

**Access Restrictions**
- Requires authorized medical professional credentials
- Access token verification (upcoming feature)
- Cannot modify patient-submitted data
- Cannot directly upload tests on behalf of patients

## Future Roadmap

The RespireX development team is committed to continuous improvement and feature expansion. The following enhancements are planned for upcoming releases:

### Phase 1: Security and Access Control (Q2 2025)

**Access Token Security for Doctor Portal**
- Implementation of strict verification token system during doctor registration
- Multi-factor authentication for healthcare provider accounts
- Integration with medical licensing databases for credential verification
- Ensures only authorized medical professionals can access the doctor portal
- Audit logging for all doctor portal access and actions

### Phase 2: Reporting and Documentation (Q3 2025)

**PDF Report Generation**
- Enable patients to download comprehensive diagnostic reports
- Professional formatting with hospital letterhead and branding options
- Digital signature and timestamp for authenticity
- HIPAA-compliant secure download mechanism

**Comprehensive Report Details**
- Complete diagnostic result summary with interpretation
- Embedded X-ray image with annotation capabilities
- Graphical representation of risk level and confidence scores
- AI-suggested treatment recommendations and follow-up protocols
- Historical trend analysis for repeat patients
- QR code for easy verification and sharing with healthcare providers

### Phase 3: Real-Time Capabilities (Q4 2025)

**Real-Time Doctor Dashboard**
- WebSocket integration for live updates
- Display of users currently performing tests
- Immediate notification system for high-risk cases
- Live queue management for doctor review
- Enables immediate intervention when critical cases are detected
- Real-time chat functionality for patient-doctor communication

### Phase 4: Advanced Analytics (Q1 2026)

**Enhanced Diagnostic Insights**
- Integration of additional ML models for multi-disease detection
- Comparison with historical population data
- Geographic disease mapping and outbreak detection
- Predictive analytics for disease progression
- Treatment outcome tracking and effectiveness analysis

### Phase 5: Mobile Applications (Q2 2026)

**Native Mobile Applications**
- iOS and Android applications for patients
- Offline capability for remote areas
- Camera integration for direct X-ray capture
- Push notifications for test results
- Telemedicine integration for virtual consultations

### Phase 6: Integration and Interoperability (Q3 2026)

**Healthcare System Integration**
- HL7 FHIR compliance for healthcare data exchange
- Integration with Electronic Health Record (EHR) systems
- Laboratory information system (LIS) connectivity
- Pharmacy integration for prescription management
- Insurance claim processing automation

## Contributing

We welcome contributions from the community to help improve RespireX and expand its impact on global tuberculosis detection and management.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style and conventions
- Write comprehensive unit tests for new features
- Update documentation to reflect changes
- Ensure all tests pass before submitting PR
- Provide detailed PR description with context and screenshots

### Areas for Contribution

- Frontend UI/UX improvements
- ML model optimization and accuracy enhancement
- Additional language translations
- Documentation improvements
- Bug fixes and performance optimization
- Security enhancements

## License

This project is licensed under the MIT License - see the LICENSE file for details. Active Development
