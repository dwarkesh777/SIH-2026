import logging
import socket
from smtplib import SMTPException, SMTPAuthenticationError
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)


class EmailService:
    """
    Service to handle SMTP email operations, particularly transactional OTP notifications.
    """
    @staticmethod
    def send_otp_email(email_address: str, otp_code: str) -> bool:
        """
        Send OTP verification code to a specified email address.
        """
        subject = "FarmVerse AI - OTP Verification Code"
        message = (
            f"Welcome to FarmVerse AI!\n\n"
            f"Your OTP code is: {otp_code}\n"
            f"This code will expire in 5 minutes.\n\n"
            f"If you did not request this, please ignore this email.\n"
            f"FarmVerse AI Support Team"
        )
        recipient_list = [email_address]
        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', '') or 'noreply@farmverse.com'

        # Print OTP directly in the terminal for seamless local development
        print(f"\n" + "=" * 55)
        print(f" [FarmVerse OTP] Destination: {email_address}")
        print(f" [FarmVerse OTP] Verification Code: >>> {otp_code} <<<")
        print(f"=" * 55 + "\n")

        try:
            sent_count = send_mail(
                subject=subject,
                message=message,
                from_email=from_email,
                recipient_list=recipient_list,
                fail_silently=False,
            )
            return True
        except SMTPAuthenticationError as e:
            logger.error(f"SMTP Authentication failed to {email_address}. Error: {str(e)}")
            return getattr(settings, 'DEBUG', False)
        except SMTPException as e:
            logger.error(f"SMTP Exception while connecting/sending to {email_address}: {str(e)}")
            return getattr(settings, 'DEBUG', False)
        except (socket.timeout, TimeoutError):
            logger.error(f"SMTP Connection Timeout to {email_address}.")
            return getattr(settings, 'DEBUG', False)
        except OSError as e:
            logger.error(f"OS/Network error sending email to {email_address}: {str(e)}")
            return getattr(settings, 'DEBUG', False)
        except Exception as e:
            logger.error(f"Failed to send OTP email to {email_address}: {str(e)}")
            return getattr(settings, 'DEBUG', False)
