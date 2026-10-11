var CRM = CRM || {};
CRM.ROLES = { BOSS:'BOSS', ADMIN:'ADMIN', TEACHER:'TEACHER' };
CRM.SHEETS = {
 Users:['id','email','passwordHash','passwordSalt','name','role','active','createdAt','updatedAt'],
 Students:['id','fullName','phone','parentPhone','smsConsent','status','createdAt','updatedAt'],
 Courses:['id','name','monthlyFee','active','createdAt','updatedAt'],
 Groups:['id','name','courseId','teacherId','status','createdAt','updatedAt'],
 GroupStudents:['id','groupId','studentId','joinedAt','leftAt','createdAt','updatedAt'],
 Schedules:['id','groupId','weekday','startTime','endTime','createdAt','updatedAt'],
 Lessons:['id','groupId','lessonDate','status','topic','createdAt','updatedAt'],
 Attendance:['id','lessonId','studentId','status','markedBy','createdAt','updatedAt'],
 PaymentObligations:['id','studentId','period','amountMinor','discountMinor','dueDate','status','createdAt','updatedAt'],
 Payments:['id','studentId','obligationId','amountMinor','paidAt','method','receivedBy','status','idempotencyKey','note','voidReason','createdAt','updatedAt'],
 Notifications:['id','userId','title','message','readAt','createdAt','updatedAt'],
 SmsLogs:['id','studentId','phone','kind','message','status','providerId','dedupeKey','error','createdAt','updatedAt'],
 AuditLogs:['id','actorId','action','entity','entityId','metadata','createdAt'],
 Settings:['id','key','value','createdAt','updatedAt']
};
CRM.permission = function(user, roles) { if (!user || !user.active || roles.indexOf(user.role) < 0) throw new Error('FORBIDDEN'); };
